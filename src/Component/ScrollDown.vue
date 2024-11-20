<template>
  <a href="#" class="scr-down"><i></i></a>
</template>

<script>
  export default {
    props: ['ScrDown']
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/styles/mixins' as *; /* mixins.scss 임포트 */

  $borderW: 50px;

  .hidden {
    bottom: -100% !important;
  }

  .scr-down {
    position: fixed;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 58px;
    height: 28px;
    background-color: transparent;
    border-top-left-radius: $borderW;
    border-top-right-radius: $borderW;
    z-index: 10;
    transition: all 0.3s cubic-bezier(1, 0, 0, 1);

    &.bg-on {
      background-color: #fff;
    }

    i {
      @include flex(flex, center, center); /* flex 믹스인 사용 */
      width: 100%;
      height: 100%;
      position: relative;

      &::before,
      &::after {
        width: 9px;
        height: 2px;
        background-color: #000;
        transition: all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
      }

      &::before {
        content: '';
        transform: rotate(225deg);
      }

      &::after {
        content: '';
        transform: rotate(135deg);
        margin-left: -3px;
      }
    }

    //on
    &.on i {
      &::before {
        content: '';
        transform: rotate(135deg);
      }

      &::after {
        content: '';
        transform: rotate(225deg);
      }
    }
  }
</style>
