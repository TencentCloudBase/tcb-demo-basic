/**
 *计算某个经纬度的周围某段距离的正方形的四个点
 *
 *@param lng float 经度
 *@param lat float 纬度
 *@param distance float 该点所在圆的半径，该圆与此正方形内切，默认值为0.5千米
 *@return array 正方形的四个点的经纬度坐标
 */

function dr_square_point($lng, $lat, $distance = 0.5) {
  $distance = $distance ? $distance : 1;
  let $r = 6371; //地球半径，平均半径为6371km
  let $dlng =
    2 *
    Math.asin(
      Math.sin($distance / (2 * $r)) / Math.cos($lat * (Math.PI / 180))
    );
  $dlng = $dlng * (180 / Math.PI);
  let $dlat = $distance / $r;
  $dlat = $dlat * (180 / Math.PI);
  return {
    leftTop: [$lat + $dlat, $lng - $dlng],
    leftBottom: [$lat - $dlat, $lng - $dlng],
    rightBottom: [$lat - $dlat, $lng + $dlng],
    rightTop: [$lat + $dlat, $lng + $dlng],
  };
}

export default dr_square_point;
