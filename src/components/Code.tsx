import { FunctionComponent } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

import ICode from '../interfaces/Code'

const Code: FunctionComponent<ICode> = ({ code, language }) => {
  return (
    <div className='mt-4 overflow-auto pr-1'>
      <Highlight {...defaultProps} theme={theme} code={code} language={language?.value}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className='rounded-xl px-3 py-1 overflow-auto' style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span>{i + 1}</span>
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Code
