import React, { PureComponent, useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import './lab.scss'
import { GatsbyDataProps } from '../../utils/interface'

const BrowserUA = (props: GatsbyDataProps) => {

  const [browser, setBrowser] = useState('')
  const [os, setOS] = useState('')
  const [ua, setUA] = useState('')
  const [platform, setPlatform] = useState('')
  const [error, setError] = useState('')

  // 获取浏览器信息（主流）
  const getBrowser = ua => {
    let browser = 'Unknown'
    let browserVersion = ''

    if (ua.indexOf('edge') > -1) {                // Edge / 12+
      browserVersion = ua.match(/edge\/\d+(.\d+)+/)[0].substr(5)
      browser = 'Microsoft Edge ' + browserVersion
    } else if (ua.indexOf('edgios') > -1) {       // Edge for iOS
      const edgeVersion = ua.match(/edgios\/\d+(.\d+)+/)[0].substr(7)
      browser = 'Edge for iOS ' + edgeVersion
    } else if (ua.indexOf('msie') > -1) {         // IE <= 10
      browserVersion = ua.match(/msie\s\d+/)[0].substr(5)
      browser = 'IE ' + browserVersion
    } else if (ua.indexOf('trident') > -1) {      // IE 11  only have 'Trident', IE 8,9,10   have both 'MSIE' & 'Trident', IE 6,7 only have 'MSIE'
      browser = 'IE 11'
    } else if (ua.indexOf('firefox') > -1) {      // Firefox
      browserVersion = ua.match(/firefox\/\d+(.\d+)+/)[0].substr(8)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      browser = 'Firefox ' + browserVersion
    } else if (ua.indexOf('opera') > -1) {        // Opera 9.8-
      browserVersion = ua.match(/opera\/\d+(.\d+)+/)[0].substr(6)
      if (Number(browserVersion) >= 9.8) {        // Opera 10+
        browserVersion = ua.match(/version\/\d+(.\d+)+/)[0].substr(8)
      }
      if (ua.indexOf('mini') > -1) {              // Opera mini
        browserVersion = 'mini ' + ua.match(/mini\/\d+(.\d+)+/)[0].substr(5)
      }
      browser = 'Opera ' + browserVersion
    } else if (ua.indexOf('opr') > -1) {          // Opera with webkit/blink
      browserVersion = ua.match(/opr\/\d+(.\d+)+/)[0].substr(4)
      if (ua.indexOf('dev') > -1) {               // Opera dev edition
        browserVersion += ' (edition developer)'
      } else if (ua.indexOf('beta') > -1) {       // Opera beta edition
        browserVersion += ' (edition beta)'
      }
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'             // Opera Mobile
      }
      browser = 'Opera ' + browserVersion
    } else if (ua.indexOf('chrome') > -1) {       // Chrome
      browserVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'             // Chrome Mobile
      }
      browser = 'Chrome ' + browserVersion
    } else if (ua.indexOf('safari') > -1) {       // Safari
      if ((ua.indexOf('blackberry') > -1) || (ua.indexOf('bb10') > -1) || (ua.indexOf('playbook') > -1)) {
        const webkitVersion = ua.match(/webkit\/\d+(.\d+)+/)[0].substr(7)
        browser = 'BlackBerry built-in / Webkit ' + webkitVersion
      } else {
        browserVersion = ua.match(/safari\/\d+(.\d+)+/)[0].substr(7)
        browser = 'Safari ' + browserVersion
      }
    }

    browser = this.otherBrowserCheck(userAgent)
    return browser
  }

  // 获取国产浏览器信息
  const otherBrowserCheck = ua => {
    let browser = 'Unknown'
    let browserVersion = ''
    let webkitVersion = ''
    let chromeVersion = ''

    // qqbrowser
    if (ua.indexOf('qqbrowser') > -1) {
      browserVersion = ua.match(/qqbrowser\/\d+(.\d+)+/)[0].substr(10)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += '(mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'QQ Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // WeiXin
    if (ua.indexOf('micromessenger') > -1) {
      const weixinVersion = ua.match(/micromessenger\/\d+(.\d+)+/)[0].substr(15)
      webkitVersion = ua.match(/webkit\/\d+(.\d+)+/)[0].substr(7)
      browser = 'WeiXin ' + weixinVersion + ' / wekit ' + webkitVersion
    }

    // QQ
    if (ua.indexOf('qq/') > -1) {
      const qqVersion = ua.match(/qq\/\d+(.\d+)+/)[0].substr(3)
      webkitVersion = ua.match(/webkit\/\d+(.\d+)+/)[0].substr(7)
      browser = 'QQ ' + qqVersion + ' / wekit ' + webkitVersion
    }

    // XiaoMi MIUI Browser
    if (ua.indexOf('miui') > -1) {
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'XiaoMi MIUI Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // UC
    if (ua.indexOf('ucbrowser') > -1 || ua.indexOf(' ubrowser') > -1) {
      browserVersion = ua.match(/browser\/\d+(.\d+)+/)[0].substr(8)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
        const match = ua.match(/u\d\/\d+(.\d+)+/)
        let uVersion = ''
        if (match) {
          uVersion = match[0].substr(1).replace('/', ' ')
        }
        browser = 'UC Browser ' + browserVersion + ' / U' + uVersion
      } else {
        if (ua.indexOf('chrome') > -1) {
          chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
          browser = 'UC Browser ' + browserVersion + ' / Chrome ' + chromeVersion
        } else if (ua.indexOf('edge') > -1) {
          const edgeVersion = ua.match(/edge\/\d+(.\d+)+/)[0].substr(5)
          browser = 'UC Browser ' + browserVersion + ' / edge ' + edgeVersion
        } else if (ua.indexOf('msie') > -1) {
          const ieVersion = ua.match(/msie\s\d+/)[0].substr(5)
          browser = 'UC Browser ' + browserVersion + ' / IE ' + ieVersion
        } else if (ua.indexOf('trident') > -1) {
          browser = 'UC Browser ' + browserVersion + ' / IE 11'
        }
      }
    }

    // sougou
    if (ua.indexOf('sogou') > -1 || ua.indexOf(' se ') > -1) {
      if (ua.indexOf('mobile') > -1) {
        browserVersion = ua.match(/browser\/\d+(.\d+)+/)[0].substr(8)
        browserVersion += ' (mobile)'
        webkitVersion = ua.match(/webkit\/\d+(.\d+)+/)[0].substr(7)
        browser = 'Sogou Browser ' + browserVersion + ' / Webkit ' + webkitVersion
      } else {
        if (ua.indexOf('chrome') > -1) {
          chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
          browser = 'Sogou Browser / Chrome ' + chromeVersion
        } else if (ua.indexOf('edge') > -1) {
          const edgeVersion = ua.match(/edge\/\d+(.\d+)+/)[0].substr(5)
          browser = 'Sogou Browser / edge ' + edgeVersion
        } else if (ua.indexOf('msie') > -1) {
          const ieVersion = ua.match(/msie\s\d+/)[0].substr(5)
          browser = 'Sogou Browser / IE ' + ieVersion
        } else if (ua.indexOf('trident') > -1) {
          browser = 'Sogou Browser / IE 11'
        }
      }
    }

    // 360 mobile (desktop is not special, refer to IE/Chrome)
    if (ua.indexOf('360 aphone browser') > -1) {
      browserVersion = ua.match(/browser\s\(\d+(.\d+)+\)/)[0].toString().slice(9, -1)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = '360 Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // liebao
    if (ua.indexOf('lbbrowser') > -1) {
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'LieBao Browser / Chrome ' + chromeVersion
    }

    // liebao mobile
    if (ua.indexOf('liebao') > -1) {
      browserVersion = ua.match(/liebaofast\/\d+(.\d+)+/)[0].substr(10)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'LieBao Fast Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // baidu
    if (ua.indexOf('bidu') > -1) {
      if (ua.indexOf('chrome') > -1) {
        browserVersion = ua.match(/browser\/\d+(.\d+)+/)[0].substr(8)
        chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
        browser = 'Baidu Browser ' + browserVersion + ' / Chrome ' + chromeVersion
      } else if (ua.indexOf('edge') > -1) {
        browserVersion = ua.match(/browser\s\d+(.\d+)+/)[0].substr(8)
        const edgeVersion = ua.match(/edge\/\d+(.\d+)+/)[0].substr(5)
        browser = 'Baidu Browser ' + browserVersion + ' / edge ' + edgeVersion
      } else if (ua.indexOf('msie') > -1) {
        browserVersion = ua.match(/browser\s\d+(.\d+)+/)[0].substr(8)
        const ieVersion = ua.match(/msie\s\d+/)[0].substr(5)
        browser = 'Baidu Browser ' + browserVersion + ' / IE ' + ieVersion
      } else if (ua.indexOf('trident') > -1) {
        browserVersion = ua.match(/browser\s\d+(.\d+)+/)[0].substr(8)
        browser = 'Baidu Browser ' + browserVersion + ' / IE 11'
      }
    }

    // baidu mobile
    if (ua.indexOf('baidu') > -1) {
      browserVersion = ua.match(/browser\/\d+(.\d+)+/)[0].substr(8)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'Baidu Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // maxthon
    if (ua.indexOf('maxthon') > -1) {
      browserVersion = ua.match(/maxthon\/\d+(.\d+)+/)[0].substr(8)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'Maxthon ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // maxthon mobile
    if (ua.indexOf('mxbrowser') > -1) {
      browserVersion = ua.match(/mxbrowser\/\d+(.\d+)+/)[0].substr(10)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'Maxthon ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // Dolphin
    if (ua.indexOf('dolphin') > -1) {
      browserVersion = ua.match(/dolphinbrowsercn\/\d+(.\d+)+/)[0].substr(17)
      chromeVersion = ua.match(/chrome\/\d+(.\d+)+/)[0].substr(7)
      browser = 'Dolphin Browser ' + browserVersion + ' / Chrome ' + chromeVersion
    }

    // The World
    if (ua.indexOf('theworld') > -1) {
      browserVersion = ua.match(/theworld\s\d+/)[0].substr(8)
      if (ua.indexOf('mobile') > -1) {
        browserVersion += ' (mobile)'
      }
      chromeVersion = ua.match(/webkit\/\d+(.\d+)+/)[0].substr(7)
      browser = 'The World ' + browserVersion + ' / wekit ' + chromeVersion
    }

    return browser
  }

  const getOS = (ua, platform) => {
    let os = 'Unknown OS'

    const isWin = (platform === 'Win32') || (platform === 'Windows')
    const isMac = (platform === 'Mac68K') || (platform === 'MacPPC') || (platform === 'Macintosh') || (platform === 'MacIntel')
    const isUnix = (platform === 'X11') && !isWin && !isMac
    const isLinux = (platform.toLowerCase().indexOf('linux') > -1) || (ua.indexOf('linux') > -1)

    const isAndroid = ua.indexOf('android') > -1
    const isIPhone = ua.indexOf('iphone') > -1
    const isIPod = ua.indexOf('ipod') > -1
    const isIPad = ua.indexOf('ipad') > -1
    const isIOS = isIPhone || isIPad || isIPod
    const isWinPhone = ua.indexOf('windows phone') > -1
    const isXBox = ua.indexOf('xbox') > -1
    const isBlackBerry = (ua.indexOf('blackberry') > -1) || (ua.indexOf('bb10') > -1) || (ua.indexOf('playbook') > -1)
    const isMeeGo = ua.indexOf('meego') > -1
    const isSymbian = ua.indexOf('symbian') > -1

    if (isMac) {
      os = 'Mac'
      const macVersionStr = ua.match(/mac\sos\sx\s[0-9]{1,2}(_[0-9]{1,2})+/)
      if (macVersionStr && macVersionStr.length) {
        const macVersion = macVersionStr[0].replace(/mac\sos\sx\s/, '').replace(/_/g, '.')
        os = os + ' ' + macVersion
      }
      return os
    }

    if (isUnix) {
      os = 'Unix'
      return os
    }

    if (isLinux && !isAndroid) {
      os = 'Linux'
      if (ua.indexOf('kf') > -1) {
        os += '/Amazon Kindle'
      }
      return os
    }

    if (isWin) {
      os = 'Windows'
      if (ua.indexOf('windows nt 5.0') > -1 || ua.indexOf('windows 2000') > -1) {
        os = 'Windows 2000'
      } else if (ua.indexOf('windows nt 5.1') > -1 || ua.indexOf('windows xp') > -1) {
        os = 'Windows XP'
      } else if (ua.indexOf('windows nt 5.2') > -1 || ua.indexOf('windows 2003') > -1) {
        os = 'Windows 2003'
      } else if (ua.indexOf('windows nt 6.0') > -1 || ua.indexOf('windows Vista') > -1) {
        os = 'Windows Vista'
      } else if (ua.indexOf('windows nt 6.1') > -1 || ua.indexOf('windows 7') > -1) {
        os = 'Windows 7'
      } else if (ua.indexOf('windows nt 6.2') > -1 || ua.indexOf('Windows 8') > -1) {
        os = 'Windows 8'
      } else if (ua.indexOf('windows nt 6.3') > -1 || ua.indexOf('windows 8.1') > -1) {
        os = 'Windows 8.1'
      } else if (ua.indexOf('windows nt 6.4') > -1 || ua.indexOf('windows nt 10.0') > -1 || ua.indexOf('windows 10') > -1) {
        os = 'Windows 10'
      }
      return os
    }

    if (isAndroid) {
      os = 'Android'
      const androidVersion = ua.match(/android\s\d+(.\d+)+/)[0].substr(8)
      if (androidVersion) {
        os = os + ' ' + androidVersion
      }
      return os
    }

    if (isIOS) {
      let iosVersion = ''
      if (isIPhone) {
        const reg = /cpu\siphone\sos\s\d+(_\d+)+/
        const str = ua.match(reg)
        if (str[0].length) {
          iosVersion = str[0].substr(14).replace(/_/g, '.')
        }
        os = 'iOS ' + iosVersion + ' / iPhone'
      } else if (isIPad) {
        const reg = /cpu\sos\s\d+(_\d+)+/
        const str = ua.match(reg)
        if (str[0].length) {
          iosVersion = str[0].substr(6).replace(/_/g, '.')
        }
        os = 'iOS ' + iosVersion + ' / iPad'
      } else if (isIPod) {
        const reg = /cpu\siphone\sos\s\d+(_\d+)+/
        const str = ua.match(reg)
        if (str[0].length) {
          iosVersion = str[0].substr(6).replace(/_/g, '.')
        }
        os = 'iOS ' + iosVersion + ' / iPod'
      } else {
        os = 'iOS'
      }
      return os
    }

    if (isWinPhone) {
      const reg = /\d+(.\d)+/
      const str = ua.substr(ua.indexOf('windows phone') + 14, 7)
      const winPhoneVersion = reg.exec(str)[0]
      os = 'Windows Phone ' + winPhoneVersion
      return os
    }

    if (isSymbian) {
      const series = ua.match(/series\d+/)[0].toString().substr(6)
      os = 'Symbian S' + series
      return os
    }

    if (isBlackBerry) {
      os = 'BlackBerry'
      if (ua.indexOf('playbook') > -1) {
        os += ' / PlayBook'
      } else if (ua.indexOf('bb10') > -1) {
        os += ' / BB10'
      }
      return os
    }

    if (isXBox) {
      os = 'XBox'
      if (ua.indexOf('xbox one') > -1) {
        os += ' One'
      } else {
        os += ' 360'
      }
      return os
    }

    if (isMeeGo) {
      os = 'MeeGo'
      return os
    }

    return os
  }

  useEffect(() => {
    if (window.navigator) {
      const { userAgent: _ua, platform: __platform } = window.navigator

      setBrowser(this.getBrowser(_ua.toLowerCase()))
      setOS(this.getOS(_ua.toLowerCase(), _platform))
      setUA(_ua)
      setPlatform(_platform)
    } else {
      setError('Browser info not detected.')
    }
  }, [])

  return (
    <Layout>
      <SEO
        title='User Agent | 实验室'
        keywords={props.data.site.siteMetadata.keywords}
      />
      <div className='mf-content lab-item'>
        <article>

          <Link to='/lab' className='back'>&laquo; Back</Link>

          <h1>UserAgent</h1>

          <p>Browser: <span id='browser'>{browser || 'Detecting ...'}</span></p>
          <p>OS: <span id='os'>{os || 'Detecting ...'}</span></p>

          <p>UA: <span id='ua'>{ua || 'Detecting ...'}</span></p>
          <p>Platform: <span id='platform'>{platform || 'Detecting ...'}</span></p>

          <p id='error'>{error}</p>
        </article>
      </div>
    </Layout>
  )
}

export default BrowserUA

export const query = graphql`

query {
  site {
    siteMetadata {
      title,
      keywords
    }
  }
}`
