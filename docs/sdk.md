# Web SDK 

This guide will show you how to get started as quickly as possible with the Web SDK from TileDesk. The Web SDK will give businesses and developers the flexibility to build and customize a chat experience that meet their specific design/brand requirements.

# Install the Web HTML Widget

To chat with your visitors embed the widget on your site.
Copy the following script and insert it in the HTML source between the HEAD tags:

```
    <script type="application/javascript">
        window.tiledeskSettings = 
            {
                projectid: "YOUR_TILEDESK_PROJECT_ID"
            };
            (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id; //js.async=!0;
            js.src = "https://widget.tiledesk.com/tiledesk.js";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'tiledesk-jssdk'));
    </script>
```

To get your TILEDESK_PROJECT_ID go to the TileDesk Dashboard and click on the Widget item of the menu:

<img src="https://raw.githubusercontent.com/chat21/chat21-web-widget/master/docs/tiledesk-dashboard-widget-screenshots.png"/>



## Configuration ##

You can customize the widget passing these parameters to  window.tiledeskSettings object:

* **projectid**. The TileDesk project id. Find your TileDesk ProjectID in the TileDesk Dashboard under the Widget menu.

* **preChatForm**: You can require customers to enter information like name and email before sending a chat message by enabling the Pre-Chat form. Permitted values: true, false. The default value is false.

* **align**: Make the chat available on the Right or on the Left of the screen. Permitted values: 'right', 'left'. Default value is right.

* **calloutTimer**: Proactively open the chat windows to increase the customer engagement. Permitted values: -1 (Disabled), 0 (Immediatly) or a positive integer value. For exmaple: 5 (After 5 seconds),  10 (After 10 seconds).

* **userFullname**: Current user fullname. Set this parameter to specify the visitor fullname.

* **userEmail**: Current user email address. Set this parameter to specify the visitor email address.

* **wellcomeMsg**: Set the widget welcome message. Value type : string

* **hideHeaderCloseButton**: Hide the close button in the widget header. Permitted values: true, false. The default value is false.

* **projectname**. If you want to display the project name in the conversations, set the projectname field. It is advisable if you need to manage multiple projects. Find your TileDesk Project Name in the TileDesk Dashboard. Value type : string

* **lang** : With this configuration it is possible to force the widget lang. The widget will try to get the browser lang, if it is not possible it will use the default "en" lang

* **isOpen**: if it is true, the chat window is automatically opened when the widget is loaded. Permitted values: true, false, Default value : false

### Example 1. Widget with user fullname and email

```
<script type="application/javascript">
      window.tiledeskSettings = 
          {
              projectid: "5b55e806c93dde00143163dd",
              userFullname: "Andrea Leo",
              userEmail: "andrea.leo@f21.it"
          };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id; //js.async=!0;
        js.src = "./tiledesk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'tiledesk-jssdk'));
    </script>
```
### Example 2. Widget with preChatForm and left alignment:

```
<script type="application/javascript">
  window.tiledeskSettings = 
    {
      projectid: "5b55e806c93dde00143163dd",
      preChatForm: true,
      align: 'left'
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id; //js.async=!0;
      js.src = "https://widget.tiledesk.com/tiledesk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'tiledesk-jssdk'));
</script>
```



# Methods

## Open the widget

This will open the widget:

```
window.tiledesk.open();
```
## Minimize the widget

This will minimize the widget:

```
window.tiledesk.close();
```


# Events

## window.tiledesk.on(event_name, handler)
Register an event handler to an event type.

The handler will have the signature function(event_data).

event_data is a Javascript CustomEvent. More info about CustomEvent [here](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)

Arguments:

| Parameter    | Type      | Required  | Description                 |
| ------------ | --------- | --------- | --------------------------  |
| event_name   | String    | YES       | Event name to bind to       |
| handler      | Function  | YES       | Function with the signature function(event_data) |


### Example 3. Logging of widget events

```
 <script type="application/javascript">    
      window.tileDeskAsyncInit = function() {
       window.tiledesk.on('beforeMessageSend', function(event_data) {
         var message =  event_data.detail;
         console.log("beforeMessageSend called ", message);
       });
       window.tiledesk.on('afterMessageSend', function(event_data) {
         var message =  event_data.detail;
         console.log("afterMessageSend called ", message);
       });
      }
</script>
```

[Full example here]( https://github.com/chat21/chat21-web-widget/blob/master/src/test.html)
 

## Load Parameters event

This event will be fired before the tiledesk parameters is loaded. Use this event to change at runtime your TileDesk settings.

Important payload of event_data:

| Parameter               | Type      | Description                      |
| ----------------------- | --------- | -------------------------------- |
| detail.default_settings | Object    | the constructor default settings |

### Example 4. Widget with visitor fullname and email from localStorage

```
<script type="application/javascript">    
    //set fullname to localstorage
    localStorage.setItem("user_fullname", "Andrea from localStorage");
    localStorage.setItem("user_email", "andrea.leo@f21.it");
    
      window.tileDeskAsyncInit = function() {
       window.tiledesk.on('loadParams', function(event_data) {
          window.tiledeskSettings.userFullname = localStorage.getItem("user_fullname");
          window.tiledeskSettings.userEmail = localStorage.getItem("user_email");
       });
      }
</script>
```
[Full example here]( https://github.com/chat21/chat21-web-widget/blob/master/src/test.html)


### Example 5. Widget with welcome message with current date

```
<script type="application/javascript">    
      window.tileDeskAsyncInit = function() {
       window.tiledesk.on('loadParams', function(event_data) {
         window.tiledeskSettings.wellcomeMsg = " Hello at: " + new Date().toLocaleString();
       });
      }
</script>
```


## Before sending messsage
This event will be fired before the message sending. Use this event to add user information or custom attributes to your chat message.

Important payload of event_data:

| Parameter  | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| detail     | Object  | the message that is being sent     |

Example. Programmatic setting custom user metadata

```
 <script type="application/javascript">    
      window.tileDeskAsyncInit = function() {
       window.tiledesk.on('beforeMessageSend', function(event_data) {
         var message =  event_data.detail;
         message.attributes.userCompany = "Frontiere21";
       });
      }
</script>
```

[Full example here]( https://github.com/chat21/chat21-web-widget/blob/master/src/test.html)


Example. Add a custom attribute (page title) to the message.

```
 <script type="application/javascript">    
      window.tileDeskAsyncInit = function() {
       window.tiledesk.on('beforeMessageSend', function(event_data) {
         var message =  event_data.detail;
         message.attributes.pagetitle = document.title;
       });
      }
</script>
```

[Full example here]( https://github.com/chat21/chat21-web-widget/blob/master/src/test.html)





## After messsage sent

This event is generated after the message has been sent.

Important payload of event_data:

| Parameter    | Type      | Description                         |
| ------------ | --------- | ----------------------------------  |
| detail       | Object    | the message that was sent           |


Example:

```
 <script type="application/javascript">    
      window.tileDeskAsyncInit = function() {
        window.tiledesk.on('afterMessageSend', function(event_data) {
          var message =  event_data.detail;
          console.log("afterMessageSend called ", message);
       });
      }
</script>
```

