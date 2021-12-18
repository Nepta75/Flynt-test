const HEADERS = { 'Content-Type': 'application/json' };

export const customFetch = (url) => {
  const fetchAPI = async (method = 'GET', body = null, paramsUrl, callback) => {
    const newUrl = paramsUrl ? `${url}/${paramsUrl}` : url;
    const res = await fetch(newUrl, {
      method,
      headers: HEADERS,
      body: body ? JSON.stringify(body) : null
    });

    const result = await res.json();
    const correctStatus = method === 'POST' ? 201 : 200;
    let err = null;
    if (res.status !== correctStatus) err = { error: true, status: res.status, message: result.message };
    const callBackWithValues = (err, result) => callback(err, result)
    callback && callBackWithValues(err, result);
  } 

  const post = (body, callback = null) => fetchAPI('POST', body, null, callback);

  const get = (paramsUrl = null, callback = null) => fetchAPI('GET', null, paramsUrl, callback);

  const del = (paramsUrl = null, callback = null) => fetchAPI('DELETE', null, paramsUrl, callback);

  const update = (body = null, paramsUrl = null, callback = null) => fetchAPI('PUT', body, paramsUrl, callback);

  const patch = (body = null, paramsUrl = null, callback = null) => fetchAPI('PATCH', body, paramsUrl, callback);

  return {
    post,
    get,
    del,
    update,
    patch
  }
}