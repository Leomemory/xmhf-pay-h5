<template>
    <div class="overlay-inner">
		<div class="overlay-dialog">
			<div class="dialog">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() { 
        return {}
    }
}
</script>

<style lang="scss" scoped>
.overlay-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: table;
    background-color: rgba(0,0,0,.5);
    z-index: 1;
    .overlay-dialog {
        display: table-cell;
        vertical-align: middle;
        padding: 0 38px;
        .dialog{
            box-sizing: border-box;
            width: 100%;
            padding: 15px !important;
            border-radius: 8px;
            background: #fff;
        }
    }
}
</style>