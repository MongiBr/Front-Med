import SlabThicknessToolbarComponent from './toolbarComponents/SlabThicknessToolbarComponent';
import VTKMPRToolbarButton from './toolbarComponents/VTKMPRToolbarButton';

const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
};

const definitions = [
 {
    id: 'StackScroll',
    label: 'Stack Scroll',
    icon: 'bars',

  },
  {
    id: 'Zoom',
    label: 'Zoom',
    icon: 'search-plus',

  },
  {
    id: 'WWWC',
    label: 'WWWC',
    icon: 'level',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableLevelTool',
    commandOptions: {},
  },
  {
    id: 'Pan',
    label: 'Pan',
    icon: 'arrows',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Pan' },
  },
  {
    id: 'Length',
    label: 'Length',
    icon: 'measure-temp',

  },
  {
    id: 'ArrowAnnotate',
    label: 'Annotate',
    icon: 'measure-non-target',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'ArrowAnnotate' },
  },
  {
    id: 'Angle',
    label: 'Angle',
    icon: 'angle-left',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Angle' },
  },
  {
    id: 'Reset',
    label: 'Reset',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetViewport',
  },
  {
    id: 'Cine',
    label: 'CINE',
    icon: 'youtube',

  },
  {
    id: 'More',
    label: 'More',
    icon: 'ellipse-circle',
    buttons: [
      {
        id: 'Magnify',
        label: 'Magnify',
        icon: 'circle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Magnify' },
      },
      {
        id: 'WwwcRegion',
        label: 'ROI Window',
        icon: 'stop',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'WwwcRegion' },
      },
      {
        id: 'DragProbe',
        label: 'Probe',
        icon: 'dot-circle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'DragProbe' },
      },
      {
        id: 'EllipticalRoi',
        label: 'Ellipse',
        icon: 'circle-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'EllipticalRoi' },
      },
      {
        id: 'RectangleRoi',
        label: 'Rectangle',
        icon: 'square-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'RectangleRoi' },
      },
      {
        id: 'Invert',
        label: 'Invert',
        icon: 'adjust',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'invertViewport',
      },
      {
        id: 'RotateRight',
        label: 'Rotate Right',
        icon: 'rotate-right',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'rotateViewportCW',
      },
      {
        id: 'FlipH',
        label: 'Flip H',
        icon: 'ellipse-h',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'flipViewportHorizontal',
      },
      {
        id: 'FlipV',
        label: 'Flip V',
        icon: 'ellipse-v',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'flipViewportVertical',
      },
      {
        id: 'Clear',
        label: 'Clear',
        icon: 'trash',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'clearAnnotations',
      },
      {
        id: 'Bidirectional',
        label: 'Bidirectional',
        icon: 'measure-target',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Bidirectional' },
      },
      {
        id: 'Download',
        label: 'Download',
        icon: 'create-screen-capture',
        //

      },
    ],
  },



  {
    id: 'Rotate',
    label: 'View Object',
    icon: 'arrows',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableRotateTool',
    commandOptions: {},
  },






  /*
  {
    id: 'setBlendModeToComposite',
    label: 'Disable MIP',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToComposite',
    commandOptions: {},
  },
  {
    id: 'setBlendModeToMaximumIntensity',
    label: 'Enable MIP',
    icon: 'soft-tissue',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToMaximumIntensity',
    commandOptions: {},
  },

  {
    id: 'increaseSlabThickness',
    label: 'Increase Slab Thickness',
    icon: 'caret-up',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'increaseSlabThickness',
    commandOptions: {},
  },
  {
    id: 'decreaseSlabThickness',
    label: 'Decrease Slab Thickness',
    icon: 'caret-down',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'decreaseSlabThickness',
    commandOptions: {},
  },
  */
  {
    id: 'changeSlabThickness',
    label: 'Slab Thickness',
    icon: 'soft-tissue',
    CustomComponent: SlabThicknessToolbarComponent,
    commandName: 'setSlabThickness',
    actionButton: {
      id: 'setSlabThickness',
      label: 'slider',
      type: TOOLBAR_BUTTON_TYPES.COMMAND,
      commandName: 'setSlabThickness',
      commandOptions: {},
    },
    deactivateButton: {
      id: 'setBlendModeToComposite',
      type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
      commandName: 'setBlendModeToComposite',
      commandOptions: {},
    },
    operationButtons: [
      {
        id: 'setBlendModeToMaximumIntensity',
        label: '',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToMaximumIntensity',
        commandOptions: {},
      },
      {
        id: 'setBlendModeToMinimumIntensity',
        label: '',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToMinimumIntensity',
        commandOptions: {},
      },
      {
        id: 'setBlendModeToAverageIntensity',
        label: '',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToAverageIntensity',
        commandOptions: {},
      },
    ],
  },
  {
    id: '2DMPR',
    label: '3D Rotate',
    icon: '3d-rotate',
    //
    CustomComponent: VTKMPRToolbarButton,
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'mpr2d',
    context: 'ACTIVE_VIEWPORT::CORNERSTONE',
  },
];

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::VTK',
};
