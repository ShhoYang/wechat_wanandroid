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

    type: {
      type: String,
      value: 'text'
    },

    password: {
      type: Boolean,
      value: false
    },

    placeholder: {
      type: String,
      value: ''
    },

    focus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
    lineFocus: false,
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
        lineFocus: true,
        clearHidden: value.length == 0
      })
    },

    blur(e) {
      this.setData({
        lineFocus: false,
        clearHidden: true
      })
    },

    input(e) {
      var value = e.detail.value
      this.setData({
        value: value,
        clearHidden: value.length == 0,
      })
      this.triggerEvent('change', e)
    },

    clear() {
      this.setData({
        content: '',
        value: '',
        focus: true,
        clearHidden: true
      })
    }
  }
})