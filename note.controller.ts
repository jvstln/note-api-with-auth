import { Request, Response } from "express";
import { HTTPError } from "./utils";

export default class NoteController {
  async getNotes(req: Request, res: Response) {
    try {
      res.json([{ title: "Default", content: "OK" }]);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.json([{ title: "Default", content: "OK" }]);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createNote(req: Request, res: Response) {
    try {
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
    } catch (error) {
      this.handleError(error, res);
    }
  }

  handleError(error: unknown, res: Response) {
    const errorCode = error instanceof HTTPError ? error.code : 500;
    const message = error instanceof Error ? error.message : error;

    res.status(errorCode).json({
      message,
      success: false,
    });
  }
}
