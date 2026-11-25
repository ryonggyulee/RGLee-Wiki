#!/usr/bin/env bash
# 사용법: ./open-with-api.sh 또는 ./open-with-api.sh resume --last
if [[ ${BASH_SOURCE[0]} != "$0" ]]; then
    printf '터미널에서 ./open-with-api.sh 로 실행하세요.\n' >&2
    return 2
fi

set +x
if [[ -z ${OPENAI_API_KEY:-} ]]; then
    printf 'OpenAI API key: ' >&2
    if ! IFS= read -rs OPENAI_API_KEY || [[ -z $OPENAI_API_KEY ]]; then
        printf '\n키 입력을 취소했습니다.\n' >&2
        exit 1
    fi
    printf '\n' >&2
fi
export OPENAI_API_KEY

# 공유 서버도 현재 터미널의 키를 상속하도록 먼저 재시작한다.
codex app-server daemon restart || exit "$?"
exec codex "$@"
