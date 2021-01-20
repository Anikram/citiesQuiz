export const calculateDistance = (p1lat, p1long, p2lat, p2long) => {
  const EARTH_RADIUS = 6371;
  //raw coordinates
  const lat1 = p1lat;
  const lng1 = p1long;
  const lat2 = p2lat;
  const lng2 = p2long;

  //converted to RADs coordinates
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  const lng1Rad = lng1 * Math.PI / 180;
  const lng2Rad = lng2 * Math.PI / 180;

  //cos and sin
  const cl1 = Math.cos(lat1Rad);
  const cl2 = Math.cos(lat2Rad);
  const sl1 = Math.sin(lat1Rad);
  const sl2 = Math.sin(lat2Rad);
  const delta = lng1Rad - lng2Rad;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;

  const ad = Math.atan2(y, x);
  const distance = ad * EARTH_RADIUS;

  return Math.round(distance)
}

export const formatDate = (dateString) => {
  const months = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"]
  const result = new Date(dateString)
  return `${result.getDate()} ${months[result.getUTCMonth()]} ${result.getFullYear()}, ${result.getHours()}:${result.getMinutes()}`
}