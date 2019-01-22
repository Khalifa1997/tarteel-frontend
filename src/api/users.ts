
export const fetchUsers = () => {
  return fetch('http://www.filltext.com/?rows=5&name={firstName}&pretty=true')
    .then(res => res.json())
    .then(json => {
      return json
    });

}
