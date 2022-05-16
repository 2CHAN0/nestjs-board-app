import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.respository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
  //Local memory
  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const board = {
  //     id: uuid(),
  //     title: createBoardDto.title,
  //     description: createBoardDto.description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return this.boards.find((board) => board.id === id);
  // }
  //
  // deleteBoardById(id: string) {
  //   const found = this.getBoardById(id);
  //   return this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
