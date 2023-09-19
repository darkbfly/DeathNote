const { execFile } = require('child_process');
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
        if (Date.now() - oldDate.getTime() < 60 * 1000 * mins) {
            console.info('脚本可执行[' + script + ']')
            scripts.push(script)
        }
    }
    return scripts
}

async function main() {
    let scripts = loadScripts(60);
    const tasks = [];
    const count = 4;
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (i > count) {
            await tasks[i - count];
            delete tasks[i - count];
        }
        console.log(`run script:${script}`)
        const name = './' + script
        tasks[i] = new Promise((resolve) => {
            const child = execFile(process.execPath, [name])
            child.stdout.on('data', function (data) {
                console.log(data)
            })
            child.stderr.on('data', function (data) {
                console.error(data)
            })
            child.on('close', function (code) {
                console.log(`${script} finished`)
                delete child
                resolve()
            })
        })
    }

    await Promise.all(tasks)
}

main()