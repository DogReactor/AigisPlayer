ipcrender.on('load-module', (event, plugin) => {
    pluginHelper.plugin = plugin;
    require(plugin.inject);
});

const { game, pluginList } = ipcrender.sendSync('require-plugins');

pluginList.forEach((plugin) => {
    if (plugin.inject && plugin.game.indexOf(game.Spec) >= 0) {
        const pluginHelper = new PluginHelper();
        pluginHelper.plugin = plugin;
        require(plugin.inject).run(pluginHelper);
    }
})