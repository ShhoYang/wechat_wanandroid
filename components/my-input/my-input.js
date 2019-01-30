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

    content: {
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
    focus: false,
    clearHidden: true
  },

  ready() {
    this.setData({
      value: this.properties.content
    })
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
      this.triggerEvent('change', value)
    },

    clear() {
      this.setData({
        content: '',
        value: '',
        focus: true,
        clearHidden: true
      })
      this.triggerEvent('change', '')
    }
  }
})