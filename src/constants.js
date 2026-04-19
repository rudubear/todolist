import img_LoadFromDisk from "../assets/images/image_loadFromDisk.png";
import img_Chores from "../assets/images/image_chores.png";
import img_Groceries from "../assets/images/image_groceries.png";
import img_Appointment from "../assets/images/image_appointments.png";
import img_Bullseye from "../assets/images/image_bullseye.png";
import img_CheckedBox from "../assets/images/image_checked_box.png";
import img_UnCheckedBox from "../assets/images/image_unchecked_box.png";
import img_Maintenance from "../assets/images/image_maintenance.png";
import img_Save from "../assets/images/image_save.png";
import img_NewProject from "../assets/images/image_newProject.png";
import img_NewTask from "../assets/images/image_newTask.png";
import img_DeleteProject from "../assets/images/image_deleteProject.png";
import img_DeleteAllProjects from "../assets/images/image_deleteAllProjects.png"
import img_DeleteTask from "../assets/images/image_deleteTask.png"
import img_WipeStorage from "../assets/images/image_wipeStorage.png";
import img_CloseProject from "../assets/images/image_closeProject.png";


export const PROJECTPREFIX = 'ProjectToDo-';
export const TODOPREFIX = 'todoItem-';
export const PROJECTDEFAULT = 'empty';

export const APPTEXT = {
    txt_noProjects : "There are no Projects. Please Create one to get started!",
    txt_noTasks : "There are no Tasks. Please Create one to get started!"
}

export const PRIORITIES = {
    HIGH : {
        PRIORITY: "HIGH",
        COLOR: "#c93900"
    },
    MEDIUM: {
        PRIORITY: "MEDIUM",
        COLOR: "#c96800"
    },
    LOW: {
        PRIORITY: "LOW",
        COLOR: "#c99400"
    },
}

export const APPSTATE = {
    LOADAPP : "Loading App Interfaces",
    OPEN : "App in default state, awaiting further commands",
    LOADDATA: "Load data from storage requested",
    SAVEDATA: "Save all data to storage requested",
    DELETEDATA: "Delete all data on storage requested",
    CREATEPROJECT: "Create Project requested",
    OPENPROJECT: "Open Project requested",
    ACTIVEOPENPROJECT: "Project is active and open for editing",
    SAVEPROJECT: "Save project to storage requested",
    CLOSEPROJECT: "Close project requested",
    DELETEPROJECT: "Delete project requested",
    DELETEPROJECTS: "Delete all projects requested",
    CREATETODO: "Create TODO Item requested",
    OPENTODO: "Open TODO Item requested",
    SAVETODO: "Save TODO Item requested",
    CLOSETODO: "Close TODO Item requested", 
    DELETETODO: "Delete TODO Item requested",
    EXIT: "Exit App requested"
}

export const BUTTON_TEXT = {
    btn_Load_Data : "Load",
    btn_Save_Data : "Save",
    btn_Create_Project: "New Project",
    btn_Open_Project: "Open Project",
    btn_Close_Project: "Close Project",
    btn_Delete_Project: "Delete",
    btn_Create_Todo: "New Task",
    btn_Open_Todo: "Open Task",
    btn_Delete_Todo: "Delete Task",
    btn_Update_Todo_Priority: "Priority",
    btn_Mark_Todo_Complete: "Mark Complete",
    btn_List_Projects_Brief: "Quick View",
    btn_List_Projects_Full: "Full View",
    btn_Delete_All_Projects: "Delete Projects",
    btn_Delete_Storage: "Wipe Storage"

}

export const IMAGES = {
    img_LoadFromDisk,
    img_Appointment,
    img_Bullseye,
    img_CheckedBox,
    img_UnCheckedBox,
    img_Chores,
    img_Groceries,
    img_Maintenance,
    img_Save,
    img_NewProject,
    img_NewTask,
    img_DeleteProject,
    img_DeleteTask,
    img_DeleteAllProjects,
    img_WipeStorage,
    img_CloseProject
}