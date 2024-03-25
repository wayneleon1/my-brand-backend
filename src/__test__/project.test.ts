import request from "supertest";
import app from "../app";
import { skillData } from "../data/static";
import { registerAndLoginUser, beforeAllHook, afterAllHook } from "./testSetup";
