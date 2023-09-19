const { readFileSync } = require('fs')
function loadScripts(mins) {
    const scripts = [];
    var options = { currentDate: new Date(), tz: 'Asia/Shanghai' };
    var parser = require('cron-parser');
    const config_file = __dirname + '/config.json'
    try {
        cron = JSON.parse(readFileSync(config_file))
    } catch (e) {
        console.error(`读取配置文件失败:${e}`)
        return []
    }
    for (let script in cron) {
        var interval = parser.parseExpression(cron[script], options);
        var oldDate = interval.prev().toDate()
        console.log(script + ' ' + oldDate)
        if (Date.now() - oldDate.getTime() < 60 * 1000 * mins) {
            console.info('脚本可执行[' + script + ']')
            scripts.push(script)
        }
    }
    return scripts
}

loadScripts(60)