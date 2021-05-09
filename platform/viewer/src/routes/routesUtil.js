import { asyncComponent, retryImport } from '@ohif/ui';
import OHIF from '@ohif/core';

const { urlUtil: UrlUtil } = OHIF.utils;

// Dynamic Import Routes (CodeSplitting)
const IHEInvokeImageDisplay = asyncComponent(() =>
    import (
        /* webpackChunkName: "IHEInvokeImageDisplay" */
        './IHEInvokeImageDisplay.js'
    )
);
const ViewerRouting = asyncComponent(() =>
    import ( /* webpackChunkName: "ViewerRouting" */ './ViewerRouting.js')
);

const StudyListRouting = asyncComponent(() =>
    import (
        /* webpackChunkName: "StudyListRouting" */
        '../studylist/StudyListRouting.js'
    )
);
const StandaloneRouting = asyncComponent(() =>
    import (
        /* webpackChunkName: "ConnectedStandaloneRouting" */
        '../connectedComponents/ConnectedStandaloneRouting.js'
    )
);
const ViewerLocalFileData = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/ViewerLocalFileData.js'
    )
);

const ViewerLocal = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/ViewerLocal.js'
    )
);


const Auth = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/Auth.js'
    )
);
const AddPatient = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/AddPatient.js'
    )
);

const AuthSignup = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/AuthSignup.js'
    )
);

const AuthForgot = asyncComponent(() =>
    import (
        /* webpackChunkName: "ViewerLocalFileData" */
        '../connectedComponents/AuthForgot.js'
    )
);

const reload = () => window.location.reload();

const ROUTES_DEF = {
    default: {
        viewer: {
            path: '/viewer/:studyInstanceUIDs',
            component: ViewerRouting,
        },
        auth: {
            path: '/',
            component: Auth,
        },
        addPatient: {
            path: '/add-patient',
            component: AddPatient,
        },
        authsignup: {
            path: '/auth/signup',
            component: AuthSignup,
        },
        authForgot: {
            path: '/auth/forgot',
            component: AuthForgot,
        },
        standaloneViewer: {
            path: '/viewer',
            component: StandaloneRouting,
        },
        list: {
            path: ['/studylist'],
            component: StudyListRouting,
            condition: appConfig => {
                return appConfig.showStudyList;
            },
        },
        local: {
            path: '/local',
            component: ViewerLocalFileData,
        },
         viewerLocal: {
            path: '/viewer/local',
            component: ViewerLocal
        },
        IHEInvokeImageDisplay: {
            path: '/IHEInvokeImageDisplay',
            component: IHEInvokeImageDisplay
        },
    },
    gcloud: {
        viewer: {
            path: '/projects/:project/locations/:location/datasets/:dataset/dicomStores/:dicomStore/study/:studyInstanceUIDs',
            component: ViewerRouting,
            condition: appConfig => {
                return !!appConfig.enableGoogleCloudAdapter;
            },
        },
        list: {
            path: '/projects/:project/locations/:location/datasets/:dataset/dicomStores/:dicomStore',
            component: StudyListRouting,
            condition: appConfig => {
                const showList = appConfig.showStudyList;

                return showList && !!appConfig.enableGoogleCloudAdapter;
            },
        },
    },
};

const getRoutes = appConfig => {
    const routes = [];
    for (let keyConfig in ROUTES_DEF) {
        const routesConfig = ROUTES_DEF[keyConfig];

        for (let routeKey in routesConfig) {
            const route = routesConfig[routeKey];
            const validRoute =
                typeof route.condition === 'function' ?
                route.condition(appConfig) :
                true;

            if (validRoute) {
                routes.push({
                    path: route.path,
                    Component: route.component,
                });
            }
        }
    }

    return routes;
};

const parsePath = (path, server, params) => {
    let _path = path;
    const _paramsCopy = Object.assign({}, server, params);

    for (let key in _paramsCopy) {
        _path = UrlUtil.paramString.replaceParam(_path, key, _paramsCopy[key]);
    }

    return _path;
};

const parseViewerPath = (appConfig = {}, server = {}, params) => {
    let viewerPath = ROUTES_DEF.default.viewer.path;
    if (appConfig.enableGoogleCloudAdapter) {
        viewerPath = ROUTES_DEF.gcloud.viewer.path;
    }

    return parsePath(viewerPath, server, params);
};

const parseStudyListPath = (appConfig = {}, server = {}, params) => {
    let studyListPath = ROUTES_DEF.default.list.path;
    if (appConfig.enableGoogleCloudAdapter) {
        studyListPath = ROUTES_DEF.gcloud.list.path || studyListPath;
    }

    return parsePath(studyListPath, server, params);
};

export { getRoutes, parseViewerPath, parseStudyListPath, reload };
