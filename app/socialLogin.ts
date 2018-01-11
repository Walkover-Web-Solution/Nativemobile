
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
  application.android.on(application.AndroidApplication.activityCreatedEvent, (args) => {
    let result = SocialLogin.init({
      activity: args.activity,
      google: {
        initialize: true,
        isRequestAuthCode: true,
        serverClientId: '641015054140-3cl9c3kh18vctdjlrt9c8v0vs85dorv2.apps.googleusercontent.com',
        shouldFetchBasicProfile: true
      },
      facebook: {
        initialize: false
      },
      onActivityResult: (requestCode: number, resultCode: number, data: any) => {
      }
    });
    SocialLogin.addLogger(function (msg, tag) {
    });
  });
}
if (application.ios) {
  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
      let gglDelegate = false;
      try {
        const errorRef = new interop.Reference();
        GGLContext.sharedInstance().configureWithError(errorRef);

        const signIn = GIDSignIn.sharedInstance();
        gglDelegate = true;
      } catch (error) {
      }
      return gglDelegate || true;
    }

    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
      const gglDelegate = GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation); // google login delegate

      return true || gglDelegate;
    }
  }
  application.ios.delegate = MyDelegate;
}
