export function getDecoderLocLink(longitude: number, latitude: number) {
  return `http://api.map.baidu.com/geocoder?location=${latitude.toFixed(
    4
  )},${longitude.toFixed(
    4
  )}&output=html&coord_type=wgs84&src=webapp.baidu.openAPIdemo`;
}

/**
 * 锁定 body 滚动，避免弹窗问题
 */
export function lockBodyScroll() {
  document.body.style.top = - document.documentElement.scrollTop + 'px';
  document.body.style.position = 'fixed';
}

/**
 * 解锁 body 滚动
 */
export function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
}