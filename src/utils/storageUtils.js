const KEY = {
  jsessionid: '@JSESSIONID@',
  userInfo: '@userInfo@',
  homePage:'@homePage@',//用于临时切换端 0消费端，1服务端
};

module.exports = {
  key: KEY,

  get: function (key) {
    return wx.getStorageSync(key) || {};
  },

  set: function (key, value) {
    wx.setStorageSync(key, value);
  },

  clear: function (key) {
    wx.removeStorageSync(key);
  },

  clearAll: function () {
    wx.clearStorage()
  }
};
