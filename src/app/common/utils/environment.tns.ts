export * from 'ui/dialogs';
export {Page, Color} from 'ui/page';
export {topmost} from 'ui/frame';
export {isIOS} from 'platform';
export {AnimationCurve} from 'ui/enums';
export {ObservableArray} from 'tns-core-modules/data/observable-array/observable-array';
export const defaultLoaderOptions = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        max: 100,
        progressNumberFormat: '%1d/%2d',
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    },
    ios: {
        details: 'Additional detail note!',
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        view: 'UIView', // Target view to show on top of (Defaults to entire window)
    }
};
