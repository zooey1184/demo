import {addJs} from '@/common/js/base.js'

export default (Vue)=> {
  addJs('//r.51gjj.com/package/chart.min.js')
  class ChartPane {
    constructor() {
      this.defaultScale = {
        scaleOverlay : false,
      	scaleOverride : false,
      	scaleSteps : null,
      	scaleStepWidth : null,
      	scaleStartValue : null,
      	scaleLineColor : "rgba(0,0,0,.1)",
      	scaleLineWidth : 1,
      	scaleShowLabels : false,
      	scaleLabel : "<%=value%>",
      	scaleFontFamily : "'Arial'",
      	scaleFontSize : 12,
      	scaleFontStyle : "normal",
      	scaleFontColor : "#666"
      }
      this.defaultAnimate = {
        animation : true,
      	animationSteps : 60,
      	animationEasing : "easeOutQuart",
      	onAnimationComplete : null
      }
      this.defaultPoint = {
        pointDot : true,
      	pointDotRadius : 3,
      	pointDotStrokeWidth : 1,
      	datasetStroke : true,
      	datasetStrokeWidth : 2,
      	datasetFill : true
      }
    }
    line(ctx, data, options) {
      let opt = {
      	scaleShowGridLines : true,
      	scaleGridLineColor : "rgba(0,0,0,.05)",
      	scaleGridLineWidth : 1,
      	bezierCurve : true
      }
      Object.assign(opt, this.defaultScale, this.defaultPoint, this.defaultAnimate)
      let option = options || opt
      new Chart(ctx).Line(data, option)
    }
    bar(ctx, data, options) {
      let opt = {
      	scaleShowGridLines : true,
      	scaleGridLineColor : "rgba(0,0,0,.05)",
      	scaleGridLineWidth : 1,
      	barShowStroke : true,
      	barStrokeWidth : 2,
      	barValueSpacing : 5,
      	barDatasetSpacing : 1
      }
      Object.assign(opt, this.defaultScale, this.defaultAnimate)
      let option = options || opt
      new Chart(ctx).Bar(data, option)
    }
    radar(ctx, data, options) {
      let opt = {
        scaleShowLabelBackdrop : true,
      	scaleBackdropColor : "rgba(255,255,255,0.75)",
      	scaleBackdropPaddingY : 2,
      	scaleBackdropPaddingX : 2,
      	angleShowLineOut : true,
      	angleLineColor : "rgba(0,0,0,.1)",
      	angleLineWidth : 1,
      	pointLabelFontFamily : "'Arial'",
      	pointLabelFontStyle : "normal",
      	pointLabelFontSize : 12,
      	pointLabelFontColor : "#666"
      }
      Object.assign(opt, this.defaultScale, this.defaultPoint, this.defaultAnimate)
      let option = options || opt
      new Chart(ctx).Radar(data, option)
    }
    polar(ctx, data, options) {
      let opt = {
      	scaleShowLine : true,
      	scaleShowLabelBackdrop : true,
      	scaleBackdropColor : "rgba(255,255,255,0.75)",
      	scaleBackdropPaddingY : 2,
      	scaleBackdropPaddingX : 2,
      	segmentShowStroke : true,
      	segmentStrokeColor : "#fff",
      	segmentStrokeWidth : 2,
      	animation : true,
      	animationSteps : 100,
      	animationEasing : "easeOutBounce",
      	animateRotate : true,
      	animateScale : false,
      	onAnimationComplete : null
      }
      Object.assign(opt, this.defaultScale)
      let option = options || opt
      new Chart(ctx).PolarArea(data, option)
    }
    pie(ctx, data, options) {
      let opt = {
        segmentShowStroke : true,
      	segmentStrokeColor : "#fff",
      	segmentStrokeWidth : 2,
      	animation : true,
      	animationSteps : 100,
      	animationEasing : "easeOutBounce",
      	animateRotate : true,
      	animateScale : false,
      	onAnimationComplete : null
      }
      let option = options || opt
      new Chart(ctx).Pie(data, option)
    }
    doughnut(ctx, data, options) {
      let opt = {
        segmentShowStroke : true,
      	segmentStrokeColor : "#fff",
      	segmentStrokeWidth : 2,
      	percentageInnerCutout : 50,
      	animation : true,
      	animationSteps : 100,
      	animationEasing : "easeOutBounce",
      	animateRotate : true,
      	animateScale : false,
      	onAnimationComplete : null
      }
      let option = options || opt
      new Chart(ctx).Doughnut(data,options);
    }
  }
  Vue.directive('chart', {
    inserted: function(el, binding, vNode) {
      console.log(el.id);
      Vue.nextTick(function() {
        let id = el.id
        if(!id) {
          alert('请设置canvas的id')
        }else {
          let ctx = document.getElementById(id).getContext("2d")
          // let b_mod = binding.modifiers
          let b_arg = binding.arg
          if(!b_arg) {
            alert('您还未选择图标类型,可查看console.log()')
            console.log(':line(折线)  :bar（柱状）  :radar（雷达）  :polar（极地）  :pie（饼状）  :doughnut（环形）');
            return
          }
          let _v = binding.value;
          let c = new ChartPane()
          if(b_arg=='line') {
            return c.line(ctx, _v.data)
          }else if(b_arg=='bar') {
            return c.bar(ctx, _v.data)
          }else if(b_arg=='radar') {
            return c.radar(ctx, _v.data)
          }else if(b_arg=='polar') {
            return c.polar(ctx, _v.data)
          }else if(b_arg=='pie') {
            return c.pie(ctx, _v.data)
          }else if(b_arg=='doughnut') {
            return c.doughnut(ctx, _v.data)
          }
        }

      })
    }
  });
}
