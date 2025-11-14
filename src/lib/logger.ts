/**
 * ロガーユーティリティ
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  /**
   * トレースIDを生成
   */
  generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * ログを出力
   */
  private log(level: LogLevel, message: string, context?: LogContext, traceId?: string): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      traceId,
      ...context
    };

    // 開発環境では見やすく整形
    if (process.env.NODE_ENV === 'development') {
      console[level === 'error' ? 'error' : 'log'](
        `[${timestamp}] [${level.toUpperCase()}] ${traceId ? `[${traceId}] ` : ''}${message}`,
        context ? context : ''
      );
    } else {
      // 本番環境ではJSON形式
      console.log(JSON.stringify(logData));
    }
  }

  /**
   * INFOレベルのログ
   */
  info(message: string, context?: LogContext, traceId?: string): void {
    this.log('info', message, context, traceId);
  }

  /**
   * WARNレベルのログ
   */
  warn(message: string, context?: LogContext, traceId?: string): void {
    this.log('warn', message, context, traceId);
  }

  /**
   * ERRORレベルのログ
   */
  error(message: string, context?: LogContext, traceId?: string): void {
    this.log('error', message, context, traceId);
  }

  /**
   * DEBUGレベルのログ
   */
  debug(message: string, context?: LogContext, traceId?: string): void {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, context, traceId);
    }
  }
}

export const logger = new Logger();
