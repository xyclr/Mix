/**
 * Created by Alex on 16/12/16.
 */
module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        }
    },
    qiniu: 'http://up-z2.qiniu.com/',
    cloudinary: {
      image: 'https://api.cloudinary.com/v1_1/dv12t6qdh/image/upload/'
    },
    addr: {
        base: 'http://localhost:1234',
        //base: 'http://rap.taobao.org/mockjs/11694',
        videos: '/api/videos',
        up: '/api/up',
        comments: '/api/comments',
        saveComments: '/api/saveComments',
        signup: '/api/u/signup',
        login: '/api/u/login',
        verify: '/api/u/verify',
        getVerifyCode: '/api/u/verify',
        signature: '/api/signature',
        userUpdate: '/api/u/update'
    }
}