# continuous-cloud-flare-speed-test

Objective: Automate network data collection and analysis
Solution:
- Chrome plugin
- https://github.com/cloudflare/speedtest

hard-requirements:
1. VPN off
2. Results are dated
3. Connection type must be specified (Wi-Fi/Ethernet), if Ethernet, please specify the port ID
4. Restrict resource consumption (open many tabs but only 1 set of test will run at 1 time?)

optional-requirements
1. Save results to local file system

## Flow
continuously running

- page loads
- disabled?
  - yes
    - do nothing
  - no
    - check VPN status
      - on
        - request to turn off
      - off
        - run test