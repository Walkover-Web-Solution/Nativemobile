
declare class GGLContext {
  static sharedInstance(): any;
};

declare class GIDSignIn {
  static sharedInstance(): any;
};

import * as application from "application";
import * as platform from "platform";
import * as utils from "utils/utils";
import * as SocialLogin from "nativescript-social-login";






if (application.android) {
  console.log("Hello I am here");
  application.android.on(application.AndroidApplication.activityCreatedEvent, (args) => {
    console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    let result = SocialLogin.init({
      activity: args.activity,
      google: {
        initialize: true,
        isRequestAuthCode: true,
        scopes: ["profile", "email"],
        serverClientId: '641015054140-22m4v5kgtpnedfiq4peo9u3vcojmespu.apps.googleusercontent.com',
        shouldFetchBasicProfile: true,
      },
      facebook: {
        initialize: false
      },
      onActivityResult: (requestCode: number, resultCode: number, data: any) => {
        console.log(requestCode);
        console.log(resultCode);
        console.log(JSON.stringify(data));
      }
    });
    SocialLogin.addLogger(function (msg, tag) {
      console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
    });
  });
}
if (application.ios) {
  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
      let gglDelegate = false;
      console.log(JSON.stringify(launchOptions));
      console.log('2');
      try {
        const errorRef = new interop.Reference();
        GGLContext.sharedInstance().configureWithError(errorRef);

        const signIn = GIDSignIn.sharedInstance();
        gglDelegate = true;
      } catch (error) {
        console.log(error);
      }
      return gglDelegate || true;
    }

    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
      console.log('3');
      const gglDelegate = GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation); // google login delegate

      return true || gglDelegate;
    }
  }
  application.ios.delegate = MyDelegate;
}
