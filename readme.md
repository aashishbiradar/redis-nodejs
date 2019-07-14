# Redis and Node.js - Task List Project

### Setup Redis
In order to get the latest version of Redis, we will use apt to install it from the official Ubuntu repositories.

```
$ sudo apt install redis-server
```

#### Edit Redis configuration file 

```
$ sudo nano /etc/redis/redis.conf
```

Inside the file, find the supervised directive. This directive allows you to declare an init system to manage Redis as a service, providing you with more control over its operation. Change it to systemd.

##### /etc/redis/redis.conf
```
# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd
```

#### Restart the Redis service
```
$ sudo systemctl restart redis.service
```

### Setup Node.js

```
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```