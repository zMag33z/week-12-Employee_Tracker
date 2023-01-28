const db = require("../connect/localize-db");

function logout(){
    db.end(() => {
        console.log(`\nDisconnecting database from local port...\n`);
    });

    process.on('exit', function (code){
        return console.log(`Closing Application...\n`);
    });

    process.exit(0);
}


module.exports = logout;