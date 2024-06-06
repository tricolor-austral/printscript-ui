import {SnippetOperations} from '../snippetOperations'
import {FakeSnippetStore} from './fakeSnippetStore'
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from '../snippet'
import autoBind from 'auto-bind'
import {PaginatedUsers} from "../users.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {FileType} from "../../types/FileType.ts";
import {Rule} from "../../types/Rule.ts";
import axios from 'axios';

const DELAY: number = 1000
const token = 'yJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkcyMTZhVzhlTHRtLTN4WC16YldQdSJ9.eyJpc3MiOiJodHRwczovL2Rldi15amkxaTV3cXB5cWRnMGUzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NjU4ZTQwOGJkYzkzZGZmMDY2YWY0YzUiLCJhdWQiOiJodHRwczovL2luc2dpcy1wZXJtaXNzaW9uIiwiaWF0IjoxNzE3NzA2OTUxLCJleHAiOjE3MTc3OTMzNTEsImd0eSI6InBhc3N3b3JkIiwiYXpwIjoiWnpja0VMU0M1OHpQOW5vVDNYaldkRTlMVWUyZkVPRW0ifQ.g07MRt4PLwqJSYDpnEa71m7yc7ZY2ovUq2k8pB9mEbmiyz03qdMpy14vMMsEhwncG7GFq3-yezux1to5U0d6Ob_Os3f1al4_1pAHP_0Ijjzbv26d2usOKLlF4JifbLfH1_oo5zxFm_QKJgOaLKkrE0Ek7i5mZKutEbwohVYRNRwpQhuMSLmIidb7TcDsBdvFERqQQIc3tjeueW4tjdDrepBD1TckY4ZOfXKqJREEt0WbG1vybwSoaTDH2QMyjauw5-_miWJ_dsFPYVBUgXUlP_tTHH-96JMAVvt6lN3SoRdhgORRz9UOSLn3rbmm_ycVTAAPuDv2P_mtkonaSR6Atw'
const BASE_URL = 'http://0110-200-10-109-202.ngrok-free.app/snippets'

export class FakeSnippetOperations implements SnippetOperations {
  private readonly fakeStore = new FakeSnippetStore()

  constructor() {
    autoBind(this)
  }

  createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.createSnippet(createSnippet)), DELAY)
    })
  }

  getSnippetById(id: string): Promise<Snippet | undefined> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getSnippetById(id)), DELAY)
    })
  }

/*  listSnippetDescriptors(page: number,pageSize: number): Promise<PaginatedSnippets> {
    const response: PaginatedSnippets = {
      page: page,
      page_size: pageSize,
      count: 20,
      snippets: page == 0 ? this.fakeStore.listSnippetDescriptors().splice(0,pageSize) : this.fakeStore.listSnippetDescriptors().splice(1,2)
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(response), DELAY)
    })
  }*/

  async listSnippetDescriptors(page: number, pageSize: number): Promise<PaginatedSnippets> {
    try {
      const response = await axios.get(
        BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          page: String(page),
          pageSize: String(pageSize),
        },
      });
      return response.data as PaginatedSnippets;
    } catch (error) {
      throw new Error(`Error fetching snippets: ${error}`);
    }
  }

  updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.updateSnippet(id, updateSnippet)), DELAY)
    })
  }

  getUserFriends(name: string = "", page: number = 1, pageSize: number = 10): Promise<PaginatedUsers> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getUserFriends(name,page,pageSize)), DELAY)
    })
  }

  shareSnippet(snippetId: string): Promise<Snippet> {
    return new Promise(resolve => {
      // @ts-expect-error, it will always find it in the fake store
      setTimeout(() => resolve(this.fakeStore.getSnippetById(snippetId)), DELAY)
    })
  }

  getFormatRules(): Promise<Rule[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getFormatRules()), DELAY)
    })
  }

  getLintingRules(): Promise<Rule[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getLintingRules()), DELAY)
    })
  }

  formatSnippet(snippetContent: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.formatSnippet(snippetContent)), DELAY)
    })
  }

  getTestCases(): Promise<TestCase[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getTestCases()), DELAY)
    })
  }

  postTestCase(testCase: TestCase): Promise<TestCase> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.postTestCase(testCase)), DELAY)
    })
  }

  removeTestCase(id: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.removeTestCase(id)), DELAY)
    })
  }

  testSnippet(): Promise<TestCaseResult> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.testSnippet()), DELAY)
    })
  }

  deleteSnippet(id: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.deleteSnippet(id)), DELAY)
    })
  }

  getFileTypes(): Promise<FileType[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.getFileTypes()), DELAY)
    })
  }

  modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.modifyFormattingRule(newRules)), DELAY)
    })
  }

  modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.fakeStore.modifyLintingRule(newRules)), DELAY)
    })
  }
}
