import React, { Component } from 'react';

class VideoFilter extends Component {

    render() {

        const { open, header } = this.props;
        return (
              <div className={open ? 'openModal modal' : 'modal'}>
                {open ? (
                  <section>
                    <header>
                      {header}
                    </header>
                    <main>
                      카메라 변경
                      얼굴 필터 설정
                    </main>
                    <footer>
                      <button className="close">
                        close
                      </button>
                  </footer>
                  </section>
                ) : null}
              </div>
            );
          }
        }
export default VideoFilter;