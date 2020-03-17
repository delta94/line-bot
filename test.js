getDurationHHmm(str) {
    const moment = require("moment");
    const scheduled = moment(str, "HH:mm");
    const now = moment(new Date());
    const duration = moment.duration(scheduled.diff(now)).asMilliseconds();
    return duration;
}
