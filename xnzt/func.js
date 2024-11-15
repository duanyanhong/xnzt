/**
 * KEY和IV都必须是16位
 * 加密
 */
/* eslint-disable */
function transferEncrypt(str,k,i)
{
    var key=CryptoJS.enc.Utf8.parse(k);// 秘钥
    var iv=CryptoJS.enc.Utf8.parse(i);//向量iv
    var encrypted=CryptoJS.AES.encrypt(str,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}