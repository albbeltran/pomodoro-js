// (function(){
    let secondCounter = 0;
    let minuteCounter = 0;
    let limit = 0;
    let limitFocus = 0;
    let limitBreak = 0;
    let timing = document.getElementById('timing');
    let subtitle = document.getElementById('subtitle');
    let btnPause = document.getElementById('btnPause');
    let audio = document.getElementById('audio');
    let btnStart = document.getElementById('btnStart');
    let btnStop = document.getElementById('btnStop');

    function onlyNumbers(e){
        key=e.keyCode || e.which;
        keyboard = String.fromCharCode(key);
        number = "0123456789";
        special = "8-37-38-46"; //array
        keyboard_special = false;

        for(let i in special){
            if(key==special[i]){
                keyboard_special = true;
            }
        }

        if(number.indexOf(keyboard)==-1 && !keyboard_special){
            return false;
        }
    }

    btnStart.addEventListener('click',function(){
        let startPomodoro = false;
        limitFocus = document.getElementById('inputFocus').value;
        limitBreak = document.getElementById('inputBreak').value;

        if(limitFocus == 0 || limitBreak == 0){
            alert('Please digit a correct time');
            startPomodoro = false;
        }
        else{
            if((limitBreak > limitFocus)||(limitBreak == limitFocus)){
                alert('The focus time must be greather than the break one!')
                startPomodoro=false;
            }
            else{
                startPomodoro=true;
            }
        }

        if(startPomodoro==true){
            limit = limitFocus;
            pomodoro(limitFocus, limitBreak, limit);
        }
    });

    function pomodoro(limitFocus, limitBreak){
        btnPause.addEventListener('click',pauseTiming);
        counter = setInterval(timingFunction,1000);
        let validate = false;
    
        function pauseTiming(){
            if(validate==false){
                //PAUSE
                btnPause.innerHTML = 'CONTINUE';
                clearInterval(counter);
                validate=true;
                audio.play();
            }
            else if(validate==true){
                //CONTINUE
                validate = false;
                
                btnPause.innerHTML = 'PAUSE';
                counter = setInterval(timingFunction,1000);
            }
        }
    
        function timingFunction(){
    
            secondCounter++;
    
            if(minuteCounter==limit){
                changeLimit();
            }
    
            if(secondCounter>59){
                if(minuteCounter>09){
                    secondCounter=0;
                    minuteCounter++;
                    timing.innerHTML = ''+minuteCounter+':0'+secondCounter;
                }
                else{
                    secondCounter=0;
                    minuteCounter++;
                    timing.innerHTML = '0'+minuteCounter+':0'+secondCounter;
                }
            }
            else{
                if(minuteCounter>09){
                    if(secondCounter>09){
                        timing.innerHTML = ''+minuteCounter+':'+secondCounter;
                    }
                    else{
                        timing.innerHTML = ''+minuteCounter+':0'+secondCounter;
                    }
    
                    // if(minuteCounter==limit){
                    //     // alert('STOP');
                    //     changeLimit();
                    // }
                }
    
                else{
                    if(secondCounter>09){
                        timing.innerHTML = '0'+minuteCounter+':'+secondCounter;
                    }
                    else{
                        timing.innerHTML = '0'+minuteCounter+':0'+secondCounter;
                    }
                }
            }
        }
    
        function changeLimit(){
    
            if(minuteCounter==limitFocus){
                limit = limitBreak;
                breakFunction();
            }
            else if(minuteCounter==limitBreak){
                limit = limitFocus;
                workFunction();
            }
        };
    
        function workFunction(){
            minuteCounter=0;
            secondCounter=0;
            subtitle.innerHTML = 'FOCUS TIME!'
            subtitle.className = 'focus';
            // body.className = 'workBackground';
        }
    
        function breakFunction(){
            minuteCounter=0;
            secondCounter=0;
            subtitle.innerHTML = 'BREAK!'
            subtitle.className = 'break';
        }
    }
// });