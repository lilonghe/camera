export function getDecoderLocLink(longitude: number, latitude: number) {
  return `http://api.map.baidu.com/geocoder?location=${latitude.toFixed(
    4
  )},${longitude.toFixed(
    4
  )}&output=html&coord_type=wgs84&src=webapp.baidu.openAPIdemo`;
}
