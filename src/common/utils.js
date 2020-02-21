// url参数拼接
export const paramUrl = (url, data) => {
    let parmUrl = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        parmUrl += `&${k}=${value}`
	}
	parmUrl = parmUrl ? parmUrl.substring(1) : ''
	return url += (url.indexOf('?') < 0 ? '?' : '&') + parmUrl
}