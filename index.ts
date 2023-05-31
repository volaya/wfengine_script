import {
    BQConnection,
    Provider,
    Workflow,
    WorkflowDiagram,
    getToolbox,
} from "@cartodb/workflows-engine";

import { readFileSync } from "fs";

const diagram: WorkflowDiagram = JSON.parse(
    readFileSync("workflow.json", "utf8")
) as WorkflowDiagram;
const connection = new BQConnection(
    "my_connection_name",
    "myproject.workflows_temp"
);
const toolbox = getToolbox(Provider.BigQuery);
const workflow = Workflow.fromDiagram("myworkflow", diagram, toolbox);

const storedproc = workflow.getAsStoredProcedure(connection, {}, true, []);
console.log(storedproc);
