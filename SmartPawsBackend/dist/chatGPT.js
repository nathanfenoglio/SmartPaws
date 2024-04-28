"use strict";
// interact with openai assistant api send question/receive response 
// on unique conversation thread for each pet
// create new thread if 1st interaction, if not use same thread
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const fs_1 = __importDefault(require("fs")); // to read assistant.json configuration from file
const process = __importStar(require("process"));
// Ensure OPENAI_API_KEY environment variable is set
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is missing or empty");
}
const openai = new openai_1.default({ apiKey });
// using the openai assistant api
function runCompletionAssistant(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { input } = request.body;
            console.log("Backend input received:", input);
            // get parameters passed in from url
            const { ownerId, petName, threadId } = request.params;
            console.log("ownerId: " + ownerId);
            console.log("petName: " + petName);
            console.log("threadId: " + threadId);
            // get assistant configuration data from json file
            const jsonContent = fs_1.default.readFileSync('assistant.json', 'utf8');
            const assistantConfiguration = JSON.parse(jsonContent);
            // just printing
            console.log(assistantConfiguration.assistantId);
            console.log(assistantConfiguration.name);
            console.log(assistantConfiguration.instructions);
            // threadIdToUse will be created fresh if threadID is "nope"
            // or set to the threadId that was passed in in the url
            let threadIdToUse = "";
            // if thread has not been associated with the pet profile
            if (threadId == "nope") {
                // if there wasn't already a thread id found for the pet "nope"
                // create a new thread for this pet profile to exclusively own
                const newThread = yield openai.beta.threads.create();
                console.log(newThread.id);
                threadIdToUse = newThread.id;
                // create the message from the pet details that were passed in the request body
                // the assistant will be able to reference in future same thread conversations
                yield openai.beta.threads.messages.create(newThread.id, {
                    role: "user",
                    content: input,
                });
            }
            else { // since threadId is not "nope", should be a valid threadId 
                threadIdToUse = threadId;
                console.log("threadIdToUse that would have been already associated with the pet profile: " + threadIdToUse);
            }
            // Check if input exists
            if (!input) {
                return response.status(400).json({ error: "Input is required" });
            }
            console.log("thread ID to use: " + threadIdToUse);
            // Pass in the user question into the existing thread
            // thread will either be newly created thread or preexisting thread of same thread id that was passed in url
            yield openai.beta.threads.messages.create(threadIdToUse, {
                role: "user",
                content: input,
            });
            // Create a run 
            const run = yield openai.beta.threads.runs.create(threadIdToUse, {
                assistant_id: assistantConfiguration.assistantId,
            });
            // Immediately fetch run status, which will be "in_progress" or "complete"
            let runStatus = yield openai.beta.threads.runs.retrieve(threadIdToUse, run.id);
            console.log("Run status:", runStatus.status);
            // Polling mechanism to see if runStatus is completed
            while (runStatus.status !== "completed") {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                runStatus = yield openai.beta.threads.runs.retrieve(threadIdToUse, run.id);
                // Check for failed, cancelled, or expired status
                if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
                    console.log(`Run status is '${runStatus.status}'. Unable to complete the request.`);
                    break; // Exit the loop if the status indicates a failure or cancellation
                }
            }
            // Get the last assistant message from the messages array
            const messages = yield openai.beta.threads.messages.list(threadIdToUse);
            // Find the last message for the current run
            const lastMessageForRun = messages.data
                .filter((message) => message.run_id === run.id && message.role === "assistant")
                .pop();
            // If an assistant message is found, console.log() it
            if (lastMessageForRun) {
                const content = lastMessageForRun.content[0];
                if ("text" in content) {
                    // It's a MessageContentText
                    console.log(`${content.text.value} \n`);
                    const responseText = content.text.value;
                    // send threadId back as well as message to frontend to update pet profile in database
                    response.json({ message: responseText, threadId: threadIdToUse });
                }
                else {
                    // check if image was sent, not handling image responses 
                    console.log("Received an image content. Handle appropriately.");
                    response.status(400).json({ error: "Received an image content. Handle appropriately." });
                }
            }
            else if ( // check for failure responses
            !["failed", "cancelled", "expired"].includes(runStatus.status)) {
                console.log("No response received from the assistant.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            response.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.default = runCompletionAssistant;
