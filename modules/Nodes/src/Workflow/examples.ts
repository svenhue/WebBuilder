import { IWorkflowConfiguration } from './workflow.core/IWorkflowConfiguration';

const exampleOne = {
    'nodes':[
        {
            'isStartNode': true,
            'type':{
                'namespace': 'core.sortnode',
                'name': 'Sort Node'
            },
            'input': {
                'parameters':{
                    'desc': true,
                    'field': 'name'
                }
            }
        }
    ],
    'initialData': {
        'items':[
            {'name': 'Zach'},
            {'name': 'Alex'},
            {'name': 'John'} 
        ]
    }
}


const exampleTwo = {
    'nodes':[
        {
            'isStartNode': true,
            'type':{
                'namespace': 'core.sortnode',
                'name': 'Sort Node'
            },
            'input': {
                'parameters':{
                    'desc': true,
                    'field': 'name'
                }
            }
        },
        {
            "type": {
                'namespace': 'core.'
            }
        }
    ],
    'initialData': {
        'items':[
            {'name': 'Zach'},
            {'name': 'Alex'},
            {'name': 'John'} 
        ]
    }
}