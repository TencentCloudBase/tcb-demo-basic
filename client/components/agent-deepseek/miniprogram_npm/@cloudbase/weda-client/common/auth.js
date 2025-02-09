function formateOrg(data) {
    let org;
    if (data) {
        org = {
            id: data.OrgId || data.orgId,
            name: data.OrgName || data.orgName,
        };
    }
    return org;
}
export function getOrg(wedaUser) {
    try {
        const mainOrg = formateOrg(wedaUser?.mainOrg);
        const orgs = (wedaUser?.orgs || []).map((item) => formateOrg(item));
        return {
            mainOrg,
            orgs,
        };
    }
    catch (err) {
        console.log('获取部门出错, err:', err);
    }
}
