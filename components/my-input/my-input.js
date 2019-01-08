Component({
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    lable: {
      type: String,
      value: ''
    },

    value: {
      type: String,
      value: ''
    },

    password: {
      type: Boolean,
      value: false
    },

    placeholder: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:'',
    focus: false,
    clearHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e) {
      var value = e.detail.value
      this.setData({
        value: value,
        focus: true,
        clearHidden: value.length == 0
      })
    },

    blur(e) {
      this.setData({
        focus: false,
        clearHidden: true
      })
    },

    input(e) {
      var value = e.detail.value
      this.setData({
        value: value,
        clearHidden: value.length == 0
      })
      this.triggerEvent('change', e.detail.value)
    },

    clear() {
      this.setData({
        content: '',
        focus: true,
        clearHidden: true
      })
    }
  }
})