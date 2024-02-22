num=0
a=baseA
b=baseB
while true;
do
        b=$(tail config.log -n 300 | grep finalized)
        if [ "$a" = "$b" ];
        then
                echo ALERT!
                num=$(( num + 1 ))
                if [ "$num" -gt 3 ];
                then
                        echo SENDING ALERT!
                        bash pagerDuty.sh
                        sleep 600
                fi
        else
                echo OK
                num=0
        fi
        a=$b
        sleep 10
done

