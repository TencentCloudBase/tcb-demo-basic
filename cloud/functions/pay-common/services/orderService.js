/**
 * 订单服务（业务钩子）
 *
 * 使用 CloudBase 数据库记录支付记录。
 * 集合：payment_records
 *
 * 关键提醒：
 * 1. handlerUnifiedTrigger 和 handlerRefundTrigger 必须做幂等检查
 * 2. 回调用应核验支付金额与下单金额是否一致（防篡改）
 */

const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

class OrderService {
    constructor() {}

    /**
     * 下单成功后记录订单
     * @param {Object} params - { out_trade_no, description, amount, payer, attach, skill_name }
     */
    async handlerUnified(params) {
        const openid = params.payer?.openid || ''
        const skillName = params.skill_name || ''
        const amountCents = params.amount?.total || 0

        try {
            // 幂等：已存在则跳过
            const existing = await db.collection('payment_records')
                .where({ orderId: params.out_trade_no })
                .limit(1)
                .get()
            if (existing.data && existing.data.length > 0) {
                console.info('[OrderService] handlerUnified 跳过（已存在）:', params.out_trade_no)
                return true
            }

            await db.collection('payment_records').add({
                data: {
                    _openid: openid,
                    orderId: params.out_trade_no,
                    skillName,
                    totalAmount: amountCents,
                    description: params.description || '',
                    status: 'pending',
                    createTime: db.serverDate()
                }
            })
            console.info('[OrderService] handlerUnified 记录成功:', params.out_trade_no)
        } catch (e) {
            console.error('[OrderService] handlerUnified 写入失败:', e.message)
        }
        return true
    }

    /**
     * 支付回调 - 更新订单状态为已支付
     * 幂等实现：先查询状态，已支付则跳过
     */
    async handlerUnifiedTrigger(params) {
        const orderId = params.out_trade_no
        const transactionId = params.transaction_id
        const tradeState = params.trade_state

        try {
            const existing = await db.collection('payment_records')
                .where({ orderId })
                .limit(1)
                .get()

            if (!existing.data || existing.data.length === 0) {
                console.warn('[OrderService] handlerUnifiedTrigger 订单不存在:', orderId)
                return true
            }

            const record = existing.data[0]
            if (record.status === 'paid') {
                console.info('[OrderService] handlerUnifiedTrigger 幂等跳过（已支付）:', orderId)
                return true
            }

            // 金额校验
            const paidAmount = params.amount?.total || 0
            if (paidAmount > 0 && paidAmount !== record.totalAmount) {
                console.error('[OrderService] handlerUnifiedTrigger 金额不匹配:',
                    '期望', record.totalAmount, '实际', paidAmount)
                return true
            }

            if (tradeState === 'SUCCESS') {
                await db.collection('payment_records')
                    .where({ orderId })
                    .update({
                        data: {
                            status: 'paid',
                            transactionId,
                            payTime: params.success_time || db.serverDate(),
                            updateTime: db.serverDate()
                        }
                    })
                console.info('[OrderService] handlerUnifiedTrigger 更新成功:', orderId, transactionId)
            }
        } catch (e) {
            console.error('[OrderService] handlerUnifiedTrigger 更新失败:', e.message)
        }
        return true
    }

    async handlerRefund(params) {
        console.info('[OrderService] handlerRefund - 退款申请:', params.out_refund_no)
        return true
    }

    async handlerRefundTrigger(params) {
        console.info('[OrderService] handlerRefundTrigger - 退款结果:', params.out_refund_no, params.refund_status)
        return true
    }

    async handlerTransfer(params, result) {
        console.info('[OrderService] handlerTransfer - 转账受理:', params.out_bill_no)
        return true
    }

    async handlerTransferTrigger(params) {
        console.info('[OrderService] handlerTransferTrigger - 转账结果:', params.out_bill_no, params.state)
        return true
    }
}

module.exports = OrderService;
