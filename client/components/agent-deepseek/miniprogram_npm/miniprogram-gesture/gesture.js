Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    propagation: {
      type: Boolean,
      value: true,
    },
    requireFailure: {
      type: Boolean,
      value: true,
    },
  },
  methods: {}
})
