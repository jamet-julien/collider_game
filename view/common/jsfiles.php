
<script>
    window.CONF = window.parent.CONF || {
        url      : '<?= API_URL; ?>',
        gamePath : '',
        mode     : 'easy',
        score    : 0
    }
    window.CONF.highMode   = ( window.performance && window.performance.memory && window.performance.memory.jsHeapSizeLimit > 800000000) ? true : false;
</script>

<script type="text/javascript" src="dist/main.js"></script>



