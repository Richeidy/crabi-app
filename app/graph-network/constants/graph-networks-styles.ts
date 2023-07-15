export const graphNetworkStylesheet: string | cytoscape.Stylesheet | cytoscape.Stylesheet[] | undefined = [
    {
      selector: 'node',
      style: {
        'label': 'data(id)',
        'text-halign': 'center',
        'text-valign': 'center',
        'color': '#353e46',
        "width": 60,
        "height": 60,
        "font-size": 20,
        "text-transform": "uppercase",
        "font-weight": "bold",
        "border-style": "solid",
        "border-color": "#87939d",
        "background-color": "#d0d4d7",
        "border-width": 3
      }
    },{
      selector: 'edge',
      style: {
        'label': 'data(weight)',
        "text-margin-y": -15,
        "text-rotation": "autorotate",
        "font-size": 16,
        "color": "#353e46",
        "font-weight": "bold",
        "line-color": "#87939d"
      }
    },{
        selector: '.selected',
        style: {
            'background-color': '#84df74',
            "border-color": "#97b772",
            "color": "#343631"
        }
    },{
        selector: '.path',
        style: {
          "curve-style": "straight",
          'line-color': '#84df74',
          "target-arrow-color": '#97b772',
          "target-arrow-shape": "triangle",
          "width": 4
        }
    },{
        selector: '.visited',
        style: {
          'background-color': '#84df74',
          "border-color": "#97b772",
          "color": "#343631"
        }
    }
]