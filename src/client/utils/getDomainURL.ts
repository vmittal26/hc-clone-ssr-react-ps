export default (URL:string) =>
    URL ? URL.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]
        : "";