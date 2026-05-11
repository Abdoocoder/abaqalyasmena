import { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh] flex flex-col items-center justify-center text-center">
          <Icon name="error" className="w-20 h-20 text-primary mb-4" />
          <h1 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">حدث خطأ</h1>
          <p className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg">
            عذراً، حدث خطأ غير متوقع. حاول تحديث الصفحة
          </p>
          <Link
            to="/"
            className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient transition-transform duration-160 ease-out-strong active:scale-[0.97]"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            العودة إلى الرئيسية
          </Link>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
