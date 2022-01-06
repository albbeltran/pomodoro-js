// (function(){
    let secondCounter = 58;
    let minuteCounter = 24;
    let limit = 0;
    let timing = document.getElementById('timing');
    let subtitle = document.getElementById('subtitle');
    let btnPause = document.getElementById('btnPause');
    let audio = document.getElementById('audio');
    let btnStart = document.getElementById('btnStart');

    btnStart.addEventListener('click',function(){
        // let inputFocus = parseFloat(document.getElementById('inputFocus').value);
        // let inputBreak = parseFloat(document.getElementById('inputBreak').value);
        validForm();
    });

    limit = 25;
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

        if(minuteCounter==25){
            limit = 5;
            breakFunction();
        }
        else if(minuteCounter==5){
            limit = 25;
            workFunction();
        }
    };

    function workFunction(){
        minuteCounter=0;
        secondCounter=0;
        subtitle.innerHTML = 'WORK TIME!'
        subtitle.className = 'work';
        body.className = 'workBackground';
    }

    function breakFunction(){
        minuteCounter=0;
        secondCounter=0;
        subtitle.innerHTML = 'BREAK!'
        subtitle.className = 'break';
    }

    function validForm(){
        if((document.getElementById('inputFocus').value=='')||(document.getElementById('inputBreak').value=='')){
            alert('Please digit a number');
        }
    }
// });