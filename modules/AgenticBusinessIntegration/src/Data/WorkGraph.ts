interface IWorkGraphNode{
    id: string;

    progress: string // in %
    startTime: string
    endTime: string

    taskDescription: string

    hasError: boolean
    isFinished: boolean;

    workType: IWorkType;
    responsibleEntity: string; // Agent name or real person
    workFullfillmentPosition: number
    isBlocker: boolean
    isFinishedWhen: string
    isTaskRoot: boolean

}
interface IWorkOrder{
    nodes: Array<IWorkGraphNode>;
    edges: Array<IWorkGraphEdge>;
    strategy: WorkStrategy;
}
interface IWorkGraphEdge{
    sourceId: string;
    targetId: string;
}
interface IWorkType{
    requiresPlanningEvaluationOrRelease: boolean;
    type?: WorkTypes;
}
enum WorkTypes{
    questionAnswering = "questionAnswering",
    simpleTaskExecution = "taskExecution",
    complexTaskExecution = "complexTaskExecution",
    conversionalEvaluation = "conversionalEvaluation",
}

class WorkStrategy{
    public static actOnly = {
        name: "actOnly",
        description: "Act only, no planning",
        requiresPlanningEvaluationOrRelease: false,
        supportedWorkTypes: [WorkTypes.questionAnswering, WorkTypes.simpleTaskExecution]
    }
    public static planAndAct = {
        name: "planAndAct",
        description: "Plan and act",
        requiresPlanningEvaluationOrRelease: true,
        supportedWorkTypes: [WorkTypes.complexTaskExecution]
    }
}

class WorkGraph{
    private nodes: Array<IWorkGraphNode>;
    private edges: Array<IWorkGraphEdge>;

    constructor() {
        this.nodes = new Array<IWorkGraphNode>();
        this.edges = new Array();
    }

    addNode(id: string, data: any) {
        this.nodes.push({

        }as IWorkGraphNode);

        this.edges.push({
            sourceId: id,
            targetId: data.targetId
        }as IWorkGraphEdge);
    }

    addEdge(sourceId: string, targetId: string) {
        if (this.edges.has(sourceId)) {
            this.edges.get(sourceId)?.push(targetId);
        }
    }

    getNode(id: string) {
        return this.nodes.get(id);
    }

    getEdges(id: string) {
        return this.edges.get(id);
    }
}

export { WorkGraph, type IWorkOrder, type IWorkGraphNode,type  IWorkGraphEdge,type  IWorkType, WorkTypes, WorkStrategy };