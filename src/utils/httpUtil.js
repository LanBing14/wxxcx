import Storage from 'storageUtils';
import Utils from '../utils/utils';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog';

const wxRequest = async (method = 'get', header, url, data, callback) => {
  return new Promise((resolve, reject) => {
    wx.request({
      method: method,
      url: `${url}`,
      data: data,
      header: {
        'content-type': 'application/json;utf-8',
        'cookie': Storage.get(Storage.key.jsessionid),
        ...header
      },
      success: (data) => {
      // 设置cookie
      setJsessionid(data.cookies);
  if (data.statusCode == 200) {
    if (data.data.code == 1) {
      // 请求成功
      resolve(data.data);
    } else if (data.data.code === -1) {
      wx.showToast({
        title:data.data.message,
        icon: 'none',
        duration: 3000
      })
      // Toast.fail(data.data.message);
    } else if (data.data.code === 401) {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length-1] //获取当前页面的对象
      if(currentPage.route!='pages/tabbar/index'){
        // 未登录跳转登录页面至
        wx.reLaunch({
          url: '/pages/tabbar/index?noLogin=true'
        })
      }
    } else if (data.data.code === 403) {
      wx.hideLoading();
      Dialog.alert({
        title: '提示',
        confirmButtonText: '前去验证',
        message: data.data.message
      }).then(() => {
        wx.reLaunch({
          url: '/pages/smrz/smrz'
        })
      });
    } else if (data.data.code === 404) {
      Dialog.alert({
        title: '提示',
        showConfirmButton: false,
        message: data.data.message
      }).then(() => {
      });
    } else {
      // 其它信息
      resolve(data.data);
    }
  } else {
    console.log("系统错误！");
  }
},
  fail: info => {
    console.log(info)
    Toast.fail('网络异常!');
  }
});
})
};

/**
 * 设置cookie登录信息
 * @param cookies
 */
function setJsessionid(cookies) {
  if (Utils.arrayIsNull(cookies)) {
    return
  }

  // 获取指定 JSESSIONID
  cookies.forEach(function (item) {
    // "JSESSIONID=E153307B7E9E11ABC53B5AF46FA09131; Path=/xyj_app_war_exploded/; HttpOnly"
    if (item.indexOf("JSESSIONID=") !== -1) {
      // 存在JSESSIONID 将JSESSIONID存入本地
      Storage.set(Storage.key.jsessionid, item);
    }
  })
}

export default {
  wxRequest: wxRequest
};
