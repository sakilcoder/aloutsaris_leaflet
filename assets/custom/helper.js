let getTimeToSeconds = function(time){
    let hrs=time.split(":");
    let seconds = parseInt(hrs[0])*60+parseInt(hrs[1])
    return seconds;
}

let getSecondstoTime = function(seconds){
    let hrs = Math.floor(seconds/60);
    let remain_seconds = seconds - hrs*60;
    return hrs + ":" + remain_seconds;
}